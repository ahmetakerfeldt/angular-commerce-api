import register from "./modules/auth/router/register";
import login from "./modules/auth/router/login";
import changePassword from "./modules/settings/router/change.password";
import changeUsername from "./modules/settings/router/change.username";
import deleteAccount from "./modules/settings/router/delete.account";
import changePhoto from "./modules/settings/router/change.photo";
import saleItem from "./modules/sales/router/sale.item";
import allSales from "./modules/sales/router/all-sales";
import userSales from "./modules/sales/router/user-sales";
import userBuys from "./modules/sales/router/user-buys";
import changeItem from "./modules/sales/router/change-item";

export function appRouter(app) {
    app.use('/login', login)
    app.use('/register', register)
    app.use('/change-password', changePassword)
    app.use('/change-username', changeUsername)
    app.use('/delete-account', deleteAccount)
    app.use('/change-photo', changePhoto)
    app.use('/sale-item', saleItem)
    app.use('/my-sales', userSales)
    app.use('/all-sales', allSales)
    app.use('/my-buys', userBuys)
    app.use('/change-item', changeItem)
}
