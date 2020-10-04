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
export const schemaLocationTransaction = {
    data: [
            "id",
            "name",
            "createdBy",
            "created",
            "isActive",
    ]
}

export const schemaOutletTransaction = {
    data: [
            "id",
            "name",
            "rate",
            "createdBy",
            "created",
            "isActive",
            "locationId"
    ]
}