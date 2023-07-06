package EventMate.entities;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "sellers")
public class Seller {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String name;
	private String city;
	private String userid;
	private String pwd;
	private String phone;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private Date createdTimestamp=new Date();
		
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}
	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}
	
	
	/*public List<Product> getProductList() {
		return productList;
	}
	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}*/
	@Override
	public String toString() {
		return "Seller [id=" + id + ", name=" + name + ", city=" + city + ", userid=" + userid + ", pwd=" + pwd
				+ ", phone=" + phone + ", createdTimestamp=" + createdTimestamp + "]";
	}
	
	
}
