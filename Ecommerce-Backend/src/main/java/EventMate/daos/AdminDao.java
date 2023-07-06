package EventMate.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import EventMate.entities.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin, String> {

}
