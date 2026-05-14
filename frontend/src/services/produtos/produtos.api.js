const produtosMock = [
    {
        id: 1,
        nome: "Notebook Gamer",
        preco: 4500,
        imagem: "https://i.ytimg.com/vi/h5SCq8uZK9U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAXIAlRZfSBaHdEm1govQW79bh8jA"
    },
    {
        id: 2,
        nome: "Mouse RGB",
        preco: 150,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMw2mBGFORJ04uKwhbURjyat55JAORWUjfww&s"
    },
    {
        id: 3,
        nome: "Teclado Mecânico",
        preco: 350,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorOlxFsuS-FLPgLcV52sD7uxIqEQ0sEweOA&s"
    },
    {
        id: 4,
        nome: "Monitor 4K",
        preco: 2800,
        imagem: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/1003955/xlarge/Monitor-Gamer-27-4k-Uhd-120hz-1ms-Displayport-HDMI-Ips-Cores-Vibrantes-Fluidez-Absoluta_1770929371.jpg"
    },
    {
        id: 5,
        nome: "Headset Gamer",
        preco: 420,
        imagem: "https://edifier.com.br/media/catalog/product/cache/eba5f2f163b55172c022905d0dc2efd7/f/o/fone_preto_com_orelha_de_gato.jpg"
    },
    {
        id: 6,
        nome: "Cadeira Gamer",
        preco: 1200,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSARSMOW5aVhHa_GGAWgQTznqPESb5tRGkrXg&s"
    },
    {
        id: 7,
        nome: "Webcam Full HD",
        preco: 280,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD-FMXnyb15rCF8Od7pVKTfIXabQvbRMpglw&s"
    },
    {
        id: 8,
        nome: "SSD 1TB",
        preco: 380,
        imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRJT618sly8ZW2ET1kwUcav8TkjG000DPrkr0XDpTVfEc7A-kNKcMSfSPP_iEtzT_dzhN2vXu-ColSz1IbgBJ-y7-8GXnGWj2u4OZBUFUIW0Elo-WZDWt-BNmESmTs3&usqp=CAc"
    },
    {
        id: 9,
        nome: "Placa de Vídeo RTX",
        preco: 3900,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7FGkig4KsVrDYvTsq5yzjqW2ndW9UMdkHgw&s"
    }
];

export const produtoApi = {

    async listarTodos() {

        return produtosMock;
    }
};

export const pedidoApi = {

    async finalizarPedido(pedido) {

        console.log("Pedido enviado:", pedido);

        return {
            sucesso: true
        };
    }
};