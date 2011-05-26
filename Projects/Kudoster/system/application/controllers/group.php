<?php

class Group extends Controller {
	
    protected $user;

    function Group()
    {
        parent::Controller();
		
        $this->load->library('form_validation');

        $this->load->model('Group_Model');
		$this->load->model('Achievement_Model');

        $this->user = $this->ion_auth->get_user();
    }

    public function index()
    {
        $data['num_groups'] = $this->Group_Model->get_num_groups($this->user->id);
        $data['groups'] = $this->Group_Model->get_groups($this->user->id);

        $this->load->view('main/header');
        $this->load->view('group/index', $data);
        $this->load->view('main/footer');
    }

    public function create()
    {
        require_once('lib/recaptchalib.php');
        $privatekey = "6LfbXcESAAAAAIdG3K0m3gJ-CzkskRw7FULFWr6U";

        $this->form_validation->set_rules('name', 'Name', 'required|xss_clean');

        if($_POST) {
            $resp = recaptcha_check_answer ($privatekey,
                                            $_SERVER["REMOTE_ADDR"],
                                            $_POST["recaptcha_challenge_field"],
                                            $_POST["recaptcha_response_field"]);
        } else {
            $resp = null;
        }

        //--Get the data out of the form
        if($this->form_validation->run() == true && $resp->is_valid)
        {
            $name = strip_tags($this->input->post('name'));
        }

        //--Try to create the group
        if($this->form_validation->run() == true && $resp->is_valid && $this->Group_Model->create_group($this->user->id, $name))
        {
            $this->session->set_flashdata('message', "User Created");
            redirect("group", 'refresh');
        } else {
            $this->data['message'] = (validation_errors() ? validation_errors() : $this->Group_Model->errors());
            $this->data['captcha'] = ($resp == null ? "" : "The captcha entered was incorrect");
            
            $this->data['name'] = array('name' => 'name',
                                'id' => 'name',
                                'type' => 'text',
                                'value' => $this->form_validation->set_value('name'),
                        );

            $this->load->view('main/header');
            $this->load->view('group/create', $this->data);
            $this->load->view('main/footer');
        }
    }

    public function view($id)
    {
        $data['group_id'] = $id;
        $data['group'] = $this->Group_Model->get_group($id);
        $data['members'] = $this->Group_Model->get_members($id);
		$data['achievements'] = $this->Achievement_Model->get_latest_group_achievements($id);
		$data['total_points'] = $this->Achievement_Model->get_group_total_points($id);
		
        $this->template->load('group/view', $data);
    }
	
	public function invite($id)
	{
		$this->load->view('main/header');
        $this->load->view('group/create', $this->data);
        $this->load->view('main/footer');
	}

    public function list_members($groupName)
    {
        
        $this->load->view('main/header');
        $this->load->view('group/create', $this->data);
        $this->load->view('main/footer');
    }
}

?>
