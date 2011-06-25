<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends Controller {
	
	function __construct() 
	{
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->library('model_validation');
		
		$this->load->model('Admin_Model');
	}
	
	function delete_key($id)
	{
		if($_SERVER['REQUEST_METHOD'] == 'POST')
		{
			$this->Admin_Model->delete_key($id);
			
			redirect('admin/list_keys');
		}
		else
		{
			$this->data['id'] = $id;
			$this->template->load('admin/delete_key', $this->data);
		}
	}
	
	function list_keys()
	{
		$this->data['keys'] = $this->Admin_Model->get_keys();
		
		$this->template->load('admin/list_keys', $this->data);
	}
	
	function generate_key()
	{
		$this->form_validation->set_rules('random_data', 'Random Data', 'trim|required|min_length[5]|max_length[12]|xss_clean');
		
		if($this->form_validation->run() == false)
		{
			$this->data['message'] = validation_errors();
			$this->template->load('admin/generate_key', $this->data);
		}
		else
		{	
			if($key = $this->Admin_Model->save_key($this->input->post('random_data')) == false)
			{
				$this->data['message'] = $this->model_validation->get_errors();
				$this->template->load('admin/generate_key', $this->data);
			}
			else
			{
				redirect('admin/list_keys');
			}
		}
	}
}