<?php

class Profile extends Controller
{
    protected $user;

    function  Profile() {
        parent::Controller();

        $this->load->library('session');
        $this->load->library('ion_auth');
        $this->load->library('form_validation');
        $this->load->helper('url');

        $this->load->model('Group_Model');
        $this->load->model('Achievement_Model');

        $this->user = $this->ion_auth->get_user();
    }

    public function index()
    {
        $data['groups'] = $this->Group_Model->get_groups($this->user->id);
        $data['num_groups'] = $this->Group_Model->get_num_groups($this->user->id);
        $data['achievements'] = $this->Achievement_Model->get_latest_achievements($this->user->id);
        $data['total_points'] = $this->Achievement_Model->get_total_points($this->user->id);
        $data['last_date'] = $this->Achievement_Model->get_last_date($this->user->id);

        $this->load->view('main/header');
        $this->load->view('profile/index', $data);
        $this->load->view('main/footer');
    }
}

?>
