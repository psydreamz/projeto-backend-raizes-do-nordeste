const express = require('express');
const router = express.Router();
const Order = require('../domain/Order');

// Rota para registrar um novo pedido com Simulação de Pagamento
router.post('/create', async (req, res) => {
    try {
        const { clienteNome, canalPedido, valorTotal } = req.body;

        // 1. Validação de Regra de Negócio: Campo canalPedido é obrigatório (Multicanalidade)
        if (!canalPedido) {
            return res.status(422).json({ 
                error: 'VALIDACAO_FALHOU', 
                message: 'O campo canalPedido (APP, TOTEM, WEB, etc) é obrigatório para rastreabilidade.' 
            });
        }

        // 2. SIMULAÇÃO DE PAGAMENTO EXTERNO (MOCK)
        // Regra: Se o valor for exatamente 999, simulamos que o gateway de pagamento recusou.
        const pagamentoAprovado = valorTotal !== 999;

        if (!pagamentoAprovado) {
            return res.status(402).json({ 
                error: 'PAGAMENTO_NEGADO', 
                message: 'A transação foi recusada pelo serviço externo de pagamento (Mock).' 
            });
        }

        // 3. Persistência no Banco de Dados com Status Atualizado
        const order = await Order.create({
            clienteNome,
            canalPedido,
            valorTotal,
            status: 'PAGO' // O pedido já entra como pago após a aprovação do mock
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(400).json({ 
            error: 'Erro ao processar pedido', 
            message: error.message 
        });
    }
});

// Rota para listar todos os pedidos (Visão da Cozinha/Matriz)
router.get('/all', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
});

module.exports = router;
