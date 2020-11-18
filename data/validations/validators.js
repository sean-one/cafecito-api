const yup = require('yup');

const validIDSchema = yup.object().shape({
    id: yup
        .number()
        .positive()
        .required()
});

const createClientSchema = yup.object().shape({
    name: yup
        .string()
        .min(5, 'must be more then 5 character')
        .max(30, 'fails max characters validation')
        .required('missing required field'),
    
    email: yup
        .string()
        .email()
        .required('missing required field')
});

const updateClientSchema = yup.object().shape({
    name: yup
        .string()
        .min(5)
        .max(30),
    
    email: yup
        .string()
        .email(),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const createProductSchema = yup.object().shape({
    item: yup
        .string()
        .required(),

    item_description: yup
        .string()
        .required(),

    item_price: yup
        .number()
        .positive()
        .required(),
    
    item_inventory: yup
        .number()
        .positive(),
    
    created_at: yup
        .date()
        .default(() => new Date()),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const updateProductSchema = yup.object().shape({
    item: yup
        .string(),

    item_description: yup
        .string(),

    item_price: yup
        .number()
        .positive(),
    
    item_inventory: yup
        .number()
        .positive()
        .min(0),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const validAmountSchema = yup.object().shape({
    amount: yup
        .number()
        .positive()
        .required(),
})

const orderlineSchema = yup.object().shape({
    product_id: yup
        .number()
        .positive(),
    
    quantity: yup
        .number()
        .positive(),
    
    price_each: yup
        .number()
        .positive(),
    
    created_at: yup
        .date()
        .default(() => new Date()),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const createOrderSchema = yup.object().shape({
    client_id: yup
        .number()
        .positive()
        .required(),
    
    order_date: yup
        .date()
        .default(() => new Date()),
    
    order_total: yup
        .number()
        .positive()
        .required(),
    
    orderlines: yup
        .array(orderlineSchema),
    
    created_at: yup
        .date()
        .default(() => new Date()),

    updated_at: yup
        .date()
        .default(() => new Date())
});

const updateOrderSchema = yup.object().shape({
    client_id: yup
        .number()
        .positive(),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const validWeekdaySchema = yup.object().shape({
    weekday: yup
        .mixed().oneOf(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
        .required()
});

const validDailyMenu = yup.array().of(yup.object().shape({
    weekday: yup
        .mixed().oneOf(["sunday","monday","tuesday","wednesday","thursday","friday","saturday"])
        .required(),
    
    product_id: yup
        .number()
        .positive()
        .required(),
    
    created_at: yup
        .date()
        .default(() => new Date()),
    
    updated_at: yup
        .date()
        .default(() => new Date())
}));



module.exports = {
    validIDSchema,
    createClientSchema,
    updateClientSchema,
    createProductSchema,
    updateProductSchema,
    validAmountSchema,
    createOrderSchema,
    updateOrderSchema,
    validWeekdaySchema,
    validDailyMenu
}