<?php

class Group_Model extends Model
{
    protected $errors = array();

    function Group_Model()
    {
        parent::Model();
        $this->load->database();
    }

    public function get_num_groups($userID)
    {
        $query = $this->db->query('SELECT * from user_organization
                                   WHERE UserID = '.$userID);

        foreach($query->result() as $row)
        {
            
        }

        return $query->num_rows();
    }

    public function get_members($groupID)
    {
        $return = array();

        $query = $this->db->query('SELECT * FROM User
                                   LEFT JOIN user_organization ON User.id = user_organization.UserID
                                   LEFT JOIN organization ON user_organization.GroupID = organization.ID
                                   WHERE organization.ID = '.$groupID);

        if($query->num_rows() > 0)
        {
            return $query->result();
        }

        return $return;
    }

    public function get_group($groupID)
    {
        $query = $this->db->select('*')
                          ->from('organization')
                          ->where('id', $groupID)
                          ->limit(1)
                          ->get();

        if($query->num_rows() > 0)
        {
            return $query->first_row();
        }
        else
        {
            return null;
        }
    }

    public function get_groups($userID)
    {
        $return = array();

        $query = $this->db->query('SELECT * FROM user_organization
                                   LEFT JOIN organization ON user_organization.GroupID = organization.ID
                                   WHERE UserID = '.$userID);

        if($query->num_rows() > 0)
        {
            return $query->result();
        }

        return $return;
    }

    public function create_group($userID, $name)
    {
        $query = $this->db->select('*')
                          ->from('organization')
                          ->where('Name', $name)
                          ->get();

        if($query->num_rows() > 0)
        {
            array_push($this->errors, 'That group name is already taken.');

            return false;
        }

        $data = array(
            'Name' => $name,
            'IsBusiness' => false
        );

        $this->db->insert('organization', $data);

        if($this->db->affected_rows() > 0)
        {
            //--If we were able to enter the information, put the user in the group
            $data = array(
                'UserID' => $userID,
                'GroupID' => $this->db->insert_id()
            );

            $this->db->insert('user_organization', $data);

            return true;
        } else {
            return false;
        }
    }

    public function errors()
    {
        $output = '';

        foreach($this->errors as $error)
        {
            $output.= $error."<br />";
        }

        return $output;
    }
}

?>
