<?php

class Blog extends Controller {
	
	function Blog()
	{
		parent::Controller();
		
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->helper('date');
		
		$this->load->model('blog/Entry_model', 'entryModel');
		$this->load->model('blog/Comment_model', 'commentModel');
		$this->load->model('blog/Tag_model', 'tagModel');
		
		//$this->load->scaffolding('blog_entries');
	}

	function index()
	{
		$this->data['title'] = "ExstoEngine Blog";
		$this->data['heading'] = "Development Notes and Updates";
		$this->data['error'] = "";
		
		$this->data['blogEntries'] = $this->entryModel->getAllEntries();
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
		$this->data['error'] = "";
		
		$this->template->load('blog/newEntry', $this->data);
	}
	
	function Comments()
	{
		$this->data['error'] = "";
		$queryResults = $this->entryModel->getEntryById($this->uri->segment(3));
		if(count($queryResults) == 1)
		{
			foreach($queryResults as $blogEntry)
			{
				$this->data['blogEntry'] = $blogEntry;
			}
		}
		else 
		{
			$this->data['title'] = "Entry not found";
			$this->data['error'] = "Blog post not found";
		}
		
		$this->data['heading'] = "Comments";
		$this->data['comments'] = $this->commentModel->getAllCommentsFor($this->uri->segment(3));
		$this->data['commentCount'] = count($this->data['comments']);
		if($this->data['commentCount'] == 0)
		{ 	
			$this->data['error'] = "There are no comments.";
		}
		
		$this->template->load('blog/comments', $this->data);
	}
	
	function comment_insert()
	{
		$this->db->insert('blog_comments', $_POST);
		redirect('blog/comments/'.$_POST['entry_id']);
	}
	
	function entry_insert()
	{
		$this->db->insert('blog_entries', $_POST);
		redirect('blog/'.$_POST['id']);
	}
}

?>