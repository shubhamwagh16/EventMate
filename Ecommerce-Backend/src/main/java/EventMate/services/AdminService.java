package EventMate.services;

import EventMate.entities.Admin;

public interface AdminService {
	Admin validate(String userid,String pwd);
	void updateAdmin(Admin amin);
}
