package EventMate.services;

import EventMate.entities.Address;

public interface AddressService {
	Address saveAddress(Address address);
	Address findAddress(int id);
}
