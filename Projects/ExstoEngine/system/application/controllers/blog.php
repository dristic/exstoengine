<?php

class Blog extends Controller {
	
	function Blog()
	{
		parent::Controller();
		
		$this->load->helper('url');
		$this->load->helper('form');
		
		$this->load->scaffolding('blog_entries');
	}

	function index()
	{
		$this->data['title'] = "ExstoEngine Blog";
		$this->data['heading'] = "Development Notes and Updates";
		$this->data['error'] = "";
		
		$this->db->select('*');
		$this->db->from('blog_entries');
		$this->data['query'] = $this->db->get();
		$this->data['rowCount'] = $this->data['query']->num_rows();
		if($this->data['rowCount'] == 0)
		{ 	
			$this->data['error'] = "There are no blog posts.";
		}
		
		$this->template->load('blog/index', $this->data);
	}
	
	function Comments()
	{
		$this->data['title'] = "Comment Title";
		$this->data['heading'] = "Comment Heading";
		$this->data['error'] = "";
		
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
}

?>