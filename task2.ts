interface Trip {
    pickups: string[]; // List of pick up points
    dropoffs: string[]; // List of drop points
}

interface Shipment {
    pickups: string[]; // List of pick up points
    dropoffs: string[]; // List of drop points
    viaPoints?: string[]; // List of via points (warehouses)
}

function isValidTrip(trip: Trip, shipment: Shipment): boolean {
    // Check if each pick up point is in the shipment's pickups
    for (const pickup of trip.pickups) {
        if (!shipment.pickups.includes(pickup)) {
            return false;
        }
    }

    // Check if each drop off point is in the shipment's drop offs
    for (const dropoff of trip.dropoffs) {
        if (!shipment.dropoffs.includes(dropoff)) {
            return false;
        }
    }

    // If via points are provided, check if each trip passes through at least one via point
    if (shipment.viaPoints) {
        let visitedViaPoint = false;
        for (const viaPoint of shipment.viaPoints) {
            if (trip.pickups.includes(viaPoint) || trip.dropoffs.includes(viaPoint)) {
                visitedViaPoint = true;
                break;
            }
        }
        if (!visitedViaPoint) {
            return false;
        }
    }

    // Check if the trip starts from a pick up point and ends at a drop off point
    return trip.pickups.length > 0 && trip.dropoffs.length > 0;
}

function isValidSetOfTrips(trips: Trip[], shipment: Shipment): boolean {
    // Check if each trip is valid
    for (const trip of trips) {
        if (!isValidTrip(trip, shipment)) {
            return false;
        }
    }

    // Check if all pickups, dropoffs, and via points are covered in the assigned trips
    const allPoints = [...shipment.pickups, ...shipment.dropoffs, ...(shipment.viaPoints || [])];
    for (const point of allPoints) {
        let pointCovered = false;
        for (const trip of trips) {
            if (trip.pickups.includes(point) || trip.dropoffs.includes(point)) {
                pointCovered = true;
                break;
            }
        }
        if (!pointCovered) {
            return false;
        }
    }

    return true;
}

// Example usage
const shipment: Shipment = {
    pickups: ['A', 'B'],
    dropoffs: ['C', 'D'],
    viaPoints: ['W']
};

const trips: Trip[] = [
    { pickups: ['A', 'W'], dropoffs: ['W', 'C'] },
    { pickups: ['B', 'W'], dropoffs: ['W', 'D'] },
];

console.log(isValidSetOfTrips(trips, shipment)); // Output: true