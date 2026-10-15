package com.motorepuestos.backend_spring.repository;

import com.motorepuestos.backend_spring.model.Producto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

/** Ejecuta las operaciones JDBC del módulo de productos. */
@Repository
public class ProductoJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductoJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Producto> listarTodos() {
        return jdbcTemplate.query(
                "SELECT id, nombre, categoria, precio, stock FROM producto ORDER BY id",
                this::mapProducto
        );
    }

    public Optional<Producto> buscarPorId(Long id) {
        List<Producto> productos = jdbcTemplate.query(
                "SELECT id, nombre, categoria, precio, stock FROM producto WHERE id = ?",
                this::mapProducto,
                id
        );
        return productos.stream().findFirst();
    }

    public Producto insertar(Producto producto) {
        String sql = "INSERT INTO producto (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    sql, Statement.RETURN_GENERATED_KEYS
            );
            statement.setString(1, producto.getNombre());
            statement.setString(2, producto.getCategoria());
            statement.setDouble(3, producto.getPrecio());
            statement.setInt(4, producto.getStock());
            return statement;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            producto.setId(keyHolder.getKey().longValue());
        }
        return producto;
    }

    public Producto actualizar(Producto producto) {
        jdbcTemplate.update(
                "UPDATE producto SET nombre = ?, categoria = ?, precio = ?, stock = ? WHERE id = ?",
                producto.getNombre(), producto.getCategoria(), producto.getPrecio(),
                producto.getStock(), producto.getId()
        );
        return producto;
    }

    public void eliminar(Long id) {
        jdbcTemplate.update("DELETE FROM producto WHERE id = ?", id);
    }

    private Producto mapProducto(java.sql.ResultSet resultSet, int rowNumber)
            throws java.sql.SQLException {
        Producto producto = new Producto();
        producto.setId(resultSet.getLong("id"));
        producto.setNombre(resultSet.getString("nombre"));
        producto.setCategoria(resultSet.getString("categoria"));
        producto.setPrecio(resultSet.getDouble("precio"));
        producto.setStock(resultSet.getInt("stock"));
        return producto;
    }
}
