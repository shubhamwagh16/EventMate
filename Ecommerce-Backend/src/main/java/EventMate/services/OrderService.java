package EventMate.services;

import java.util.List;

import EventMate.entities.Customer;
import EventMate.entities.Order;

public interface OrderService {

	Order saveOrder(Order order);
	List<Order> getAllOrders();
	List<Order> getCustomerOrders(Customer customer);
	Order findById(int id);
}
