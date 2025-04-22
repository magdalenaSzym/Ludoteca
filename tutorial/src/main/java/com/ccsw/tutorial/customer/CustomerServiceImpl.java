package com.ccsw.tutorial.customer;

import com.ccsw.tutorial.customer.model.Customer;
import com.ccsw.tutorial.customer.model.CustomerDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    /**
     * {@inheritDoc}
     */
    public List<Customer> findAll() {
        return (List<Customer>) this.customerRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void save(Long id, CustomerDto dto) {

        Customer customer;

        if (id == null) {
            customer = new Customer();
        } else {
            customer = this.customerRepository.findById(id).orElse(null);
        }

        customer.setName(dto.getName());
        this.customerRepository.save(customer);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) throws Exception {
        if (this.customerRepository.findById(id).orElse(null) == null) {
            throw new Exception("Not exists");
        }

        this.customerRepository.deleteById(id);
    }

    @Override
    public Customer get(Long id) {
        return this.customerRepository.findById(id).orElse(null);
    }
}
