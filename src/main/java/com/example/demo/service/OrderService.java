package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.demo.model.OrderDTO;
import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService implements OrderServiceInterface {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void save(OrderDTO orderDTO) {
        Order order = new Order();
        order.setName(orderDTO.getName());
        order.setPrice(orderDTO.getPrice());

        orderRepository.save(order);
    }

    @Override
    public List<OrderDTO> getAll() {
        return orderRepository.findAll().stream()
                .map(entity -> new OrderDTO(entity.getId(), entity.getName(), entity.getPrice()))
                .toList();

    }

    @Override
    public OrderDTO get(Long id) {
        return orderRepository.findById(id)
                .map(entity -> new OrderDTO(entity.getId(), entity.getName(), entity.getPrice()))
                .orElse(null);
    }

    @Override
    public OrderDTO update(Long id, OrderDTO orderDTO) {
        return orderRepository.findById(id)
                .map(entity -> {
                    entity.setName(orderDTO.getName());
                    entity.setPrice(orderDTO.getPrice());
                    orderRepository.save(entity);
                    return new OrderDTO(entity.getId(), entity.getName(), entity.getPrice());
                })
                .orElse(null);
    }

    @Override
    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}
