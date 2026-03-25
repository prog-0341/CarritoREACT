import { useState, useEffect } from 'react';

interface Producto {
    nombre: string;
    precio: number;
}

const KEY_COMPRADOR = 'comprador';
const KEY_PRODUCTOS = 'productos';

function App() {
    const [comprador, setComprador] = useState<string>('');
    const [inputComprador, setInputComprador] = useState<string>('');
    const [productos, setProductos] = useState<Producto[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [precio, setPrecio] = useState<string>('');

    useEffect(() => {
        const nombreGuardado = sessionStorage.getItem(KEY_COMPRADOR);
        if (nombreGuardado) {
            setComprador(nombreGuardado);
            setInputComprador(nombreGuardado);
        }
        const productosGuardados = sessionStorage.getItem(KEY_PRODUCTOS);
        if (productosGuardados) {
            setProductos(JSON.parse(productosGuardados));
        }
    }, []);

    const guardarComprador = () => {
        if (inputComprador.trim() === '') {
            alert('Por favor ingresa tu nombre.');
            return;
        }
        sessionStorage.setItem(KEY_COMPRADOR, inputComprador.trim());
        setComprador(inputComprador.trim());
    };

    const agregarProducto = () => {
        if (nombre.trim() === '') {
            alert('Por favor ingresa el nombre del producto.');
            return;
        }
        const precioNum = parseFloat(precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            alert('Por favor ingresa un precio válido mayor a 0.');
            return;
        }
        const nuevos = [...productos, { nombre: nombre.trim(), precio: precioNum }];
        setProductos(nuevos);
        sessionStorage.setItem(KEY_PRODUCTOS, JSON.stringify(nuevos));
        setNombre('');
        setPrecio('');
    };

    const eliminarProducto = (index: number) => {
        const nuevos = productos.filter((_, i) => i !== index);
        setProductos(nuevos);
        sessionStorage.setItem(KEY_PRODUCTOS, JSON.stringify(nuevos));
    };

    const vaciarCarrito = () => {
        setProductos([]);
        sessionStorage.removeItem(KEY_PRODUCTOS);
    };

    const total = productos.reduce((acc, p) => acc + p.precio, 0);

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">

                        {/* Comprador */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold">
                                    <i className="bi bi-person-circle me-2"></i>Comprador
                                </h5>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu nombre"
                                        value={inputComprador}
                                        onChange={e => setInputComprador(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-dark"
                                        onClick={guardarComprador}
                                    >
                                        Guardar
                                    </button>
                                </div>
                                {comprador !== '' && (
                                    <p className="mt-2 mb-0 text-muted">
                                        <i className="bi bi-check-circle-fill text-success me-1"></i>
                                        Comprando como: <strong>{comprador}</strong>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Formulario agregar producto */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold">
                                    <i className="bi bi-cart3 me-2"></i>Carrito de Compras
                                </h5>
                                <div className="mb-3">
                                    <label className="form-label">Nombre del producto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej. Manzanas"
                                        value={nombre}
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Precio ($)</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="0.00"
                                            value={precio}
                                            onChange={e => setPrecio(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-success w-100 fw-semibold"
                                    onClick={agregarProducto}
                                >
                                    <i className="bi bi-bag-plus me-1"></i> Agregar al carrito
                                </button>
                            </div>
                        </div>

                        {/* Lista de productos */}
                        <div className="card shadow-sm">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <span className="fw-semibold">
                                    <i className="bi bi-list-ul me-1"></i> Lista de productos
                                </span>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={vaciarCarrito}
                                >
                                    <i className="bi bi-trash me-1"></i> Vaciar
                                </button>
                            </div>

                            <div className="card-body p-2">
                                {productos.length === 0 ? (
                                    <p className="text-muted text-center py-3 mb-0">
                                        Tu carrito está vacío
                                    </p>
                                ) : (
                                    productos.map((producto, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center p-2 border-bottom"
                                        >
                                            <span>
                                                <i className="bi bi-bag me-2 text-secondary"></i>
                                                <strong>{producto.nombre}</strong>
                                            </span>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="badge bg-success fs-6">
                                                    ${producto.precio.toFixed(2)}
                                                </span>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => eliminarProducto(index)}
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <span className="text-muted">Total a pagar</span>
                                <span className="fs-5 fw-bold text-success">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;