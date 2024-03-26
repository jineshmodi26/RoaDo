interface UserDetail {
    userId: string;
    loggedIn: Date;
    loggedOut: Date;
    lastSeenAt: Date;
}

function calculateMonthlyStats(userDetails: UserDetail[]): Map<string, { loggedIn: number; active: number }> {
    const monthlyStats = new Map<string, { loggedIn: number; active: number }>();

    userDetails.forEach(user => {
        const loggedInMonth = user.loggedIn.getMonth();
        const loggedInYear = user.loggedIn.getFullYear();
        const loggedInKey = `${loggedInYear}-${loggedInMonth}`;

        if (!monthlyStats.has(loggedInKey)) {
            monthlyStats.set(loggedInKey, { loggedIn: 1, active: 0 });
        } else {
            monthlyStats.get(loggedInKey)!.loggedIn++;
        }

        const lastSeenMonth = user.lastSeenAt.getMonth();
        const lastSeenYear = user.lastSeenAt.getFullYear();

        if (loggedInMonth === lastSeenMonth && loggedInYear === lastSeenYear) {
            monthlyStats.get(loggedInKey)!.active++;
        }
    });

    return monthlyStats;
}

const userDetails: UserDetail[] = [
    { userId: "user1", loggedIn: new Date("2024-01-15"), loggedOut: new Date("2024-01-20"), lastSeenAt: new Date("2024-01-19") },
    { userId: "user2", loggedIn: new Date("2024-01-20"), loggedOut: new Date("2024-01-25"), lastSeenAt: new Date("2024-01-22") },
];

const monthlyStats = calculateMonthlyStats(userDetails);
console.log(monthlyStats);