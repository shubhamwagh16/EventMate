package EventMate.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import EventMate.daos.ProductDao;
import EventMate.entities.Product;
import EventMate.utils.StorageService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired ProductDao dao;
	@Autowired
	private StorageService storageService;
	@Autowired SellerService sellerService;
	@Override
	public void addProduct(Product p,MultipartFile pic) {
		// TODO Auto-generated method stub
		String photo=storageService.store(pic);
		p.setPhoto(photo);
		dao.save(p);
	}

	@Override
	public List<Product> findProducts(int sellerId) {
		// TODO Auto-generated method stub
		return dao.findBySeller(sellerService.findById(sellerId),Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public void updateProduct(Product p) {
		Product pp=dao.getById(p.getProdid());
		p.setSeller(pp.getSeller());
		dao.save(p);
	}

	@Override
	public void deleteProduct(int prodid) {
		// TODO Auto-generated method stub
		Product p=dao.getById(prodid);
		dao.delete(p);
	}

	@Override
	public List<Product> allProducts() {
		// TODO Auto-generated method stub
		return dao.findAll(Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public Product findProductById(int prodid) {
		// TODO Auto-generated method stub
		return dao.getById(prodid);
	}

	@Override
	public List<Product> categoryProducts(String pcat,String subcat) {
		// TODO Auto-generated method stub
		return dao.findByPcatAndSubcat(pcat, subcat,Sort.by(Sort.Direction.DESC,"prodid"));
	}

	@Override
	public Page<Product> allProductsPaginated(int page,int pagesize) {
		Page<Product> prods=dao.findAll(PageRequest.of(page, pagesize,Sort.by(Direction.DESC, "prodid")));
		System.err.println(prods.getSize());
		return prods;
	}
}
