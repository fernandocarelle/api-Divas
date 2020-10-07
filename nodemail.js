const mailer = require("nodemailer");
 
module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'contato@divasbeleza.com.br',
            pass: '3xRsmYbc1tKZpF0f'
        }
    })
    
    const mail = {
        from: "Divas <contato@divasbeleza.com.br>",
        to: "contato@divasbeleza.com.br",
        replyTo: email,
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}