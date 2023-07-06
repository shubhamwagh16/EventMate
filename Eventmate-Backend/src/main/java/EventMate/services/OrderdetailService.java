package EventMate.services;

import java.util.List;

import EventMate.entities.Order;
import EventMate.entities.OrderDetails;

public interface OrderdetailService {

	void saveOrderDetails(OrderDetails od);
	OrderDetails findById(int id);
	List<OrderDetails> findByOrder(Order order);
}
