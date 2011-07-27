<?php

class Blog extends Controller {
	
	function Blog()
	{
		parent::Controller();
		
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->helper('date');
		
		//$this->load->scaffolding('blog_entries');
	}

	function index()
	{
		$this->data['title'] = "ExstoEngine Blog";
		$this->data['heading'] = "Development Notes and Updates";
		$this->data['error'] = "";
		
		$query = $this->db->select('*')
				 ->from('blog_entries')
				 ->join('User', 'User.id = blog_entries.author_id')
				 ->get();
		
		$this->data['query'] = $query;
		$this->data['rowCount'] = $query->num_rows();
		if($this->data['rowCount'] == 0)
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
		$this->db->where('id', $this->uri->segment(3));
		$query = $this->db->get('blog_entries');
		if($query->num_rows() == 1)
		{
			foreach($query->result() as $blogEntry)
			{
				$this->data['title'] = $blogEntry->title;
			}
			$this->data['error'] = "";
		}
		else 
		{
			$this->data['title'] = "Entry not found";
			$this->data['error'] = "Blog post not found";
		}
		
		$this->data['heading'] = "Comments";
		
		$this->db->where('entry_id', $this->uri->segment(3));
		$this->data['query'] = $this->db->get('blog_comments');
		$this->data['rowCount'] = $this->data['query']->num_rows();
		if($this->data['rowCount'] == 0)
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