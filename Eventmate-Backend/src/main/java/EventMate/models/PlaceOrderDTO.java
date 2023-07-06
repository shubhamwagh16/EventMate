package EventMate.models;

import java.util.List;

import EventMate.entities.Address;
import EventMate.entities.Payment;

public class PlaceOrderDTO {

	private Address address;
	private List<CartDTO> cart;
	private Payment payment;
	private int customerid;
	
	public int getCustomerid() {
		return customerid;
	}
	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public List<CartDTO> getCart() {
		return cart;
	}
	public void setCart(List<CartDTO> cart) {
		this.cart = cart;
	}
	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	
	
}
