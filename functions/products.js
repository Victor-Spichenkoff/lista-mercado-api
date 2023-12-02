const { create } = require('domain')
const prisma = require('../config/prisma')

module.exports = (app) => {
    const getAllById = async (req, res) => {
        const id = Number(req.params.id)

        const products = await prisma.product.findMany({where: {id_purchase:id}})

        console.log('get: ' + id)
        console.log(products)
        
        res.status(200).send(products)
    }

    const createProduct = async (req, res) => {
        const product = {...req.body}
        product.name = product.name?? 'Não Informado'
        product.price = product.price?? 1
        product.units = product.units?? 1
        try{
            const affected = await prisma.product.create({
                data: {
                    name: product.name,
                    price: parseFloat(product.price),
                    units: Number(product.units),
                    id_purchase: Number(product.id_purchase),
                    added: false
                }
            })


            if(!affected) {
                res.send('Não foi possível salvar')
            } else {
                res.sendStatus(204)
            }
        } catch(e) {
            console.log('erro: '+e)
            res.status(500).send('Não foi possível salvar: '+ e)
        }
    }


    // const updateProduct = async (req, res) => {//primeira vez foi direto!!!!!!!
    //     const product = {...req.body}
    //     console.log(product)
        
    //     try{
    //         await prisma.product.update({
    //             // where: {id_purchase: product.id_purchase},
    //             where: {id: product.id},
    //         //     data: {
    //         //         name:  String(product.name),
    //         //         price: parseFloat(product.price),
    //         //         units: Number(product.units),
    //         //         added: product.added
    //         // },
    //         data: {...product}
    //         })

    //         const p = await prisma.product.findMany({
    //             where:{id_purchase: product.id_purchase}
    //         })
    //         console.log(p)
    //     } catch(e) {
    //         return res.status(500)
    //     }
    // }
    const updateProduct = async (req, res) => {//primeira vez foi direto!!!!!!!
        const product = {...req.body}
        // console.log(product)
        product.name = product.name?? 'Não Informado'
        product.price = product.price?? 1
        product.units = product.units?? 1
        try{
            await prisma.product.update({
                where: {id_purchase: product.id_purchase},
                where: {id: product.id},
                data: {
                    name: product.name,
                    price: parseFloat(product.price),
                    units: Number(product.units),
                    added: product.added
            }
            })

            console.log("Após atualização: ")
            console.log(product)
        } catch(e) {
            return res.sendStatus(500)
        }
    }


    const deletar = async (req, res) => {
        const id = Number(req.params.id)

        console.log(req.params.id)
        try{
            const deleted = await prisma.product.delete({
                where: {
                    id: Number(id)
                }})
        } catch(e) {
            res.sendStatus(500)
        }
    }



    return { getAllById, createProduct, updateProduct, deletar }
}