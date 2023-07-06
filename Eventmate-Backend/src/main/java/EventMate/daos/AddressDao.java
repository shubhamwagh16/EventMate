package EventMate.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import EventMate.entities.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer> {

}
