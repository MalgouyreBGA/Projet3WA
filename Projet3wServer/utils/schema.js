import Joi from 'joi';

export const schemaPointRelais = Joi.object({
    Enseigne: Joi.string().length(8).pattern(new RegExp('^[0-9A-Z]{2}[0-9A-Z]{6}$')).required(),
    Pays: Joi.string().length(2).pattern(new RegExp('^[A-Za-z]{2}$')).required(),
    NumPointRelais: Joi.string().pattern(new RegExp('^[0-9]{6}$')).length(6),
    Ville: Joi.string().pattern(new RegExp("^[A-Za-z_\\- ]{2,25}$")).max(25),
    CP: Joi.string(),
    Latitude: Joi.string().max(11).pattern(new RegExp('-?[0-9]{1,2}\.[0-9]{1,7}')),
    Longitude: Joi.string().max(11).pattern(new RegExp('-?[0-9]{1,2}\.[0-9]{1,7}')),
    Taille: Joi.string().pattern(new RegExp('^(XS|S|M|L|XL|XXL|3XL)$')),
    Poids: Joi.string().max(6).pattern(new RegExp('^[0-9]{1,6}$')),
    Action: Joi.string().pattern(new RegExp('^(REL|24R|24L|24X|DRI)$')),
    DelaiEnvoi: Joi.string().length(2).pattern(new RegExp('^(-?[0-9]{2})$')),
    RayonRecherche: Joi.string().max(4).pattern(new RegExp('^[0-9]{1,4}$')),
    TypeActivite: Joi.string().pattern(new RegExp('(\d{3},|\d{3})*')),
    NACE: Joi.string(),
    NombreResultats: Joi.number().integer(),
}).with('Pays', 'CP').with('Latitude', 'Longitude')