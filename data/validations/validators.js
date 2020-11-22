const yup = require('yup');

// ID validation
const validIDSchema = yup.object().shape({
    id: yup
        .number()
        .positive()
        .required()
});


// client table validation
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
        .min(5, 'must be more then 5 character')
        .max(30, 'fails max characters validation'),
    
    email: yup
        .string()
        .email(),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});


// product table validation
const createProductSchema = yup.object().shape({
    item: yup
        .string()
        .required('missing field is required'),

    item_description: yup
        .string()
        .required('missing field is required'),

    item_price: yup
        .number()
        .positive('value must be positive')
        .required('missing field is required'),
    
    item_inventory: yup
        .number()
        .positive('value must be positive'),
});

const updateProductSchema = yup.object().shape({
    item: yup
        .string(),

    item_description: yup
        .string(),

    item_price: yup
        .number()
        .positive('value must be positive'),
    
    item_inventory: yup
        .number()
        .positive('value must be positive')
        .min(0),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const validAmountSchema = yup.object().shape({
    amount: yup
        .number()
        .positive('value must be positive')
        .required('missing field is required'),
    
    updated_at: yup
        .date()
        .default(() => new Date())
})


// order / orderlines validation
const orderlineSchema = yup.object().shape({
    product_id: yup
        .number()
        .positive('value must be positive'),
    
    quantity: yup
        .number()
        .positive('value must be positive'),
    
    price_each: yup
        .number()
        .positive('value must be positive'),
    
});

const createOrderSchema = yup.object().shape({
    client_id: yup
        .number()
        .positive('value must be positive')
        .required('missing field is required'),
    
    order_date: yup
        .date()
        .default(() => new Date()),
    
    order_total: yup
        .number()
        .positive('value must be positive')
        .required('missing field is required'),
    
    orderlines: yup
        .array(orderlineSchema),
});

const updateOrderSchema = yup.object().shape({
    client_id: yup
        .number()
        .positive('value must be positive'),
    
    updated_at: yup
        .date()
        .default(() => new Date())
});

const validWeekdaySchema = yup.object().shape({
    weekday: yup
        .mixed().oneOf(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"])
        .required('missing field is required')
});

const validDailyMenu = yup.array().of(yup.object().shape({
    weekday: yup
        .mixed().oneOf(["sunday","monday","tuesday","wednesday","thursday","friday","saturday"])
        .required('missing field is required'),
    
    product_id: yup
        .number()
        .positive('value must be positive')
        .required('missing field is required'),
    
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