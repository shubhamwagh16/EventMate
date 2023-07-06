package EventMate.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import EventMate.entities.Payment;

public interface PaymentDao extends JpaRepository<Payment, Integer> {

}
