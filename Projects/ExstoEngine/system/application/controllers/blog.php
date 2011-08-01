<?php

class Blog extends Controller {
	
	function Blog()
	{
		parent::Controller();
		
		$this->load->helper(array('url', 'form', 'date'));
		$this->load->library('form_validation');
		
		$this->load->model('blog/Entry_model', 'entryModel');
		$this->load->model('blog/Comment_model', 'commentModel');
		$this->load->model('blog/Tag_model', 'tagModel');
		
		//$this->load->scaffolding('blog_entries');
	}

	function index()
	{
		$user = $this->ion_auth->get_user();
		$this->data['title'] = "ExstoEngine Blog";
		$this->data['heading'] = "Development Notes and Updates";
		$this->data['canPost'] = false;
		$this->data['error'] = "";
		
		if($this->ion_auth->logged_in())
		{
			$this->data['blogEntries'] = $this->entryModel->getAllEntriesByGroup($user->group_id);
			if($user->group_id == 1)
			{
				$this->data['canPost'] = true;
			}
		}
		else 
		{
			$this->data['blogEntries'] = $this->entryModel->getAllEntriesByGroup(3); // Public Entries
		}
		
		$this->data['entryCount'] = count($this->data['blogEntries']);
		if($this->data['entryCount'] == 0)
		{ 	
			$this->data['error'] = "There are no blog posts.";
		}
		
		$this->template->load('blog/index', $this->data);
	}
	
	function NewEntry()
	{
		$this->data['title'] = "ExstoEngine Blog";
		$this->data['heading'] = "New Blog Entry";
		$this->data['canPost'] = false;
		$this->data['error'] = "";
		
		$tags = $this->tagModel->getAllTags();
		$tagList;
		foreach($tags as $tag)
		{
			$tagList[$tag->id] = $tag->name;
		}
		$this->data['tagList'] = $tagList;
		
		
		$this->form_validation->set_rules('title', 'Title', 'required|min_length[5]|max_length[100]|xss_clean');
		$this->form_validation->set_rules('body', 'Body', 'required|xss_clean');
		if($this->form_validation->run() == FALSE)
		{
			$this->data['formError'] = validation_errors();
			$this->template->load('blog/newEntry', $this->data);
		}
		else
		{
			$this->template->load('blog');
		}
	}
	
	function Entry()
	{
		$this->data['blogEntry'] = null;
		$this->data['canView'] = false;
		$this->data['canComment'] = false;
		$this->data['error'] = "";
		
		$queryResults = $this->entryModel->getEntryById($this->uri->segment(3));
		if(count($queryResults) == 1)
		{
			foreach($queryResults as $blogEntry)
			{
				$this->data['blogEntry'] = $blogEntry;
				if($this->ion_auth->logged_in())
				{
					$user = $this->ion_auth->get_user();
					if($user->group_id <= $blogEntry->tagGroup)
					{
						$this->data['canView'] = true;
						$this->data['canComment'] = true;
					}
				}
				else if($blogEntry->tagGroup == 3) //Public entry
				{
					$this->data['canView'] = true;
				}
				else 
				{
					$this->data['error'] = "You do not have permission to view this entry.";
				}
			}
		}
		else 
		{
			$this->data['error'] = "Blog post not found";
		}
		
		$this->data['heading'] = "Comments";
		$this->data['comments'] = $this->commentModel->getAllCommentsFor($this->uri->segment(3));
		$this->data['commentCount'] = count($this->data['comments']);
		if($this->data['commentCount'] == 0)
		{ 	
			$this->data['error'] = "There are no comments.";
		}
		
		$this->template->load('blog/entry', $this->data);
	}
	
	function comment_insert()
	{
		$this->db->insert('blog_comments', $_POST);
		redirect('blog/entry/'.$_POST['entry_id']);
	}
	
	function entry_insert()
	{
		
		
		$blog_entry_data;
		$entry_tag_data;
		
		$blog_entry_data['title'] = $_POST['title'];
		$blog_entry_data['body'] = $_POST['body'];
		$blog_entry_data['author_id'] = $_POST['author_id'];
		$blog_entry_data['date'] = $_POST['date'];
		$this->db->insert('blog_entries', $blog_entry_data);
				
		$blog_entry_tag_data['entry_id'] = $this->db->insert_id();
		$blog_entry_tag_data['tag_id'] = $_POST['tag_id'];
		$this->db->insert('blog_entry_tags', $blog_entry_tag_data);
		
		redirect('blog/'.$_POST['id']);
	}
}

?>