<?php

class Welcome extends CI_Controller {

	function Welcome()
	{
		parent::__construct();
		
		$this->load->library('form_validation');
		$this->load->library('email');
		$this->load->model('Newsletter_Model');
	}
	
	function index()
	{
		$this->template->load('index');
	}
	
	function index2()
	{
		$this->template->load_template('shared/_layout2', 'index2');
	}
	
	function message()
	{
		$this->template->load('shared/message');
	}
	
	public function signup()
	{
		$this->form_validation->set_rules('email', 'Email Address', 'trim|required|min_length[5]|max_length[100]|xss_clean');
		$this->form_validation->set_rules('comment', 'Comment', 'trim|required|min_length[5]|max_length[2000]|xss_clean');
		
		if($this->form_validation->run() == false) 
		{
			$this->data['message'] = validation_errors();
			$this->template->load_template('shared/minimal', 'signup/form', $this->data);
		} 
		else 
		{
			$email = $this->input->post('email');
			$comment = $this->input->post('comment');
			
			if($this->Newsletter_Model->signup($email, $comment) == true) {
				$this->send_mail($email, $comment);
			}
			
			$this->template->load_template('shared/minimal', 'signup/complete');
		}
	}
	
	private function send_mail($email, $comment) {
		$this->email->from('info@exstoengine.com', 'Exsto Engine Signup Form');
		$this->email->to('danr@exstoengine.com');
		$this->email->subject('Exsto Engine Signup Form: '.$email);
		$this->email->message($email.' : '.$comment);
		$this->email->send();
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */