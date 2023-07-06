package EventMate.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import EventMate.daos.SellerDao;
import EventMate.entities.Seller;

@Service
public class SellerServiceImpl implements SellerService {

	@Autowired private SellerDao dao;
	@Override
	public void registerSeller(Seller seller) {
		// TODO Auto-generated method stub
		dao.save(seller);
	}

	@Override
	public List<Seller> allSellers() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Seller findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Seller validate(String userid, String pwd) {
		Seller seller=dao.findByUserid(userid);
		if(seller!=null && seller.getPwd().equals(pwd)) {
			return seller;
		}
		return null;
	}

	@Override
	public void deleteSeller(int id) {
		// TODO Auto-generated method stub
		Seller seller=dao.getById(id);
		dao.delete(seller);
	}

}
