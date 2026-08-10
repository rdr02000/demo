package com.example.demo;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.demo.model.Order;
import com.example.demo.model.OrderDTO;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoRepositoryTest {

    @Autowired
    private OrderRepository demoRepository;

    @Autowired
    private OrderService orderService;

    @Test
    void shouldSaveAndFindEntity() {
        Order entity = new Order();
        entity.setName("sample");
        entity.setPrice(12.99);

        Order saved = demoRepository.save(entity);

        assertThat(saved.getId()).isNotNull();
        assertThat(demoRepository.findById(saved.getId())).isPresent();
    }

    @Test
    void shouldExposeOrderIdInApiDto() {
        OrderDTO dto = new OrderDTO("sample", 12.99);
        
        orderService.save(dto);

        OrderDTO saved = orderService.getAll().stream()
            .filter(order -> "sample".equals(order.getName()))
            .findFirst()
            .orElseThrow();

        assertThat(saved.getId()).isNotNull();
    }
}
