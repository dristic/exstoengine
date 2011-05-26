<?php

class Achievement_Model extends CI_Model
{
    protected $errors = array();

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_latest_achievements($userID)
    {
        $return = array();

        $query = $this->db->select('organization.Name as OrganizationName, achievement.Name as Name, Description, Points, Date')
                          ->from('user_achievement')
                          ->join('achievement', 'user_achievement.AchievementID = achievement.ID')
                          ->join('organization', 'achievement.OrganizationID = organization.ID')
                          ->where('UserID', $userID)
                          ->order_by('Date', 'desc')
                          ->limit(20)
                          ->get();

        if($query->num_rows() > 0)
        {
            foreach($query->result() as $row)
            {
                array_push($return, $row);
            }
        }

        return $return;
    }
	
	public function get_latest_group_achievements($groupID)
	{
		$return = array();
		
		$query = $this->db->select('organization.Name as OrganizationName, achievement.Name as Name, Description, Points, Date, User.username as UserName')
						  ->from('user_achievement')
						  ->join('achievement', 'user_achievement.AchievementID = achievement.ID')
						  ->join('organization', 'achievement.OrganizationID = organization.ID')
						  ->join('User', 'User.ID = user_achievement.UserID')
						  ->where('OrganizationID', $groupID)
						  ->order_by('Date', 'desc')
						  ->limit(20)
						  ->get();
						  
	  	if($query->num_rows() > 0)
		{
			foreach($query->result() as $row)
			{
				array_push($return, $row);
			}
		}
		
		return $return;
	}

    public function get_last_date($userID)
    {
        $query = $this->db->select('Date')
                          ->from('user_achievement')
                          ->where('UserID', $userID)
                          ->order_by('Date', 'desc')
                          ->limit(1)
                          ->get();

        if($query->num_rows() > 0)
        {
            return $query->first_row()->Date;
        } 
        else
        {
            return null;
        }
    }

    public function get_total_points($userID)
    {
        $return = 0;

        $query = $this->db->select_sum('Points')
                          ->from('user_achievement')
                          ->join('achievement', 'user_achievement.AchievementID = achievement.ID')
                          ->where('UserID', $userID)
                          ->get();

        $return = $query->row()->Points;

        return $return;
    }
    
	public function get_group_total_points($id)
    {
    	$return = 0;
    	
    	$query = $this->db->select_sum('Points')
                          ->from('user_achievement')
                          ->join('achievement', 'user_achievement.AchievementID = achievement.ID')
                          ->join('user_organization', 'user_achievement.UserID = user_organization.UserID')
                          ->where('GroupID', $id)
                          ->get();

        $return = $query->row()->Points;
        
        return $return;
    }
}

?>