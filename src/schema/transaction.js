export const schemaListTransaction = {
    data: [
        "id",
        "created",
        "updated",
        "locationId",
        "outletId",
        "deviceId",
        "date",
        "counterIn",
        "counterOut",
        "rate",
        "total",
        "tolerance",

        "location.id",
        "location.name",
        "location.createdBy",
        "location.created",
        "location.isActive",

        "outlet.id",
        "outlet.name",
        "outlet.rate",
        "outlet.createdBy",
        "outlet.created",
        "outlet.isActive",

        "device.id",
        "device.createdBy",
        "device.created",
        "device.isActive",
        "device.locationId",
        "device.outletId",
        "device.phoneNumber",
    ]
}
export const schemaAddTransaction = {
    data: [

    ]
}