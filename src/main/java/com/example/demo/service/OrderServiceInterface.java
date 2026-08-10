package com.example.demo.service;

import java.util.List;

import com.example.demo.model.OrderDTO;

public interface OrderServiceInterface {

    void save(OrderDTO demoDTO);

    List<OrderDTO> getAll();

    OrderDTO get(Long id);

    OrderDTO update(Long id, OrderDTO demoDTO);

    void delete(Long id);
}
