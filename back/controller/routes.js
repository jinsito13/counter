import pgp from "./../src/db.js";
const db = pgp("postgres://postgres:othinus13@localhost:5432/appcont");

//handlers
const getContador = async (req, res) => {
    const respuesta = await db.query('SELECT * FROM contador ORDER BY id DESC');
    res.status(200).send({
            respuesta
    })
};

const getContadorById = async (req, res) => {
    const contId = parseInt(req.params.id);
    const respuesta = await db.query("SELECT * FROM contador WHERE id = $1 ORDER BY id DESC", [contId]);
    res.status(200).send({
        message : "contador por id",
        body : {contador : {respuesta}},
    })
};

const createContador = async (req, res) => {
    try {
        const {nombre} = req.body;
        console.log(req.body)
        const {rows} = await db.query("INSERT INTO contador(nombre) VALUES ($1)", [nombre]);
        res.status(201).send({body : {rows}})
    } catch (error) {
        console.log(error)
        res.status(500).send({body : "err"})
    }
    
};

const deleteContador = async (req, res) => {
    const contId = parseInt(req.params.id);
    await db.query('DELETE FROM contador WHERE id = $1', [contId]);
    res.status(200).send({
        message : "contador eliminado con id =", contId
    });
};

const updateContador = async (req, res) => {
    try{
        const contId = parseInt(req.params.id);
        const {nombre} = req.body;
        console.log(req.body)
        const {respuesta} = await db.query("UPDATE contador SET nombre = $1 WHERE id = $2", [nombre, contId]);
        res.status(200).send({respuesta});
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({body: "err"})
    }

};

const incrementContador = async (req, res) => {
        const contId = parseInt(req.params.id);
        const call = await db.query("UPDATE contador SET cont = cont + 1 WHERE id = $1", [contId]);
        const respuesta = await db.query("SELECT cont FROM contador WHERE id = $1", [contId]);
        res.status(200).send({respuesta});
        
};

const decreaseContador = async (req, res) => {
        const contId = parseInt(req.params.id);
        const respuesta = await db.query("UPDATE contador SET cont = cont - 1 WHERE id = $1", [contId]);
        res.status(200).send({message : "el contador ha sido aumentado su id es: ", contId});
};
//export to index.js
export {getContador as getCont,
        updateContador as updateCont,
        getContadorById as getContById,
        createContador as createCont,
        deleteContador as deleteCont,
        incrementContador as IncCont,
        decreaseContador as decrCont
};