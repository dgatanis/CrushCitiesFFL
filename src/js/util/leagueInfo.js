export const leagueID = "1046222222567784448"
 // your league name
export const dues = 200; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper

export const inauguralSeason = 2024;

export default async function getCurrentLeagueId() {
    const myTest = currentSeason();

    myTest.then((thisYear) => {
        console.log("thisYear " + thisYear);
        return currentLeagueId(thisYear);
    }).catch((error) => {
        console.error(`Error fetching currentLeagueID: ${error.message}`);
    });
}

async function currentLeagueId(thisYear) {
    const myUserId = '467550885086490624';
    const leagueName = "Crush Cities ";
    const userLeagues = await fetch(`https://api.sleeper.app/v1/user/${myUserId}/leagues/nfl/${thisYear}`);
    const leagueData = await userLeagues.json();

    const leagues = leagueData.map((league) => league);
    
    for(let league of leagues)
    {
        if(leagueData.find(x => x.name === leagueName))
        {
            let currentLeagueId = league.league_id;
            return currentLeagueId;
        }
    }
}

async function currentSeason() {
    const nflState = getNFLState();

    nflState.then((nflData) => {
        console.log("nflData.league_season " + nflData.league_season);
        return nflData.league_season;
    }).catch((error) => {
        console.error(`Error fetching currentLeagueID: ${error.message}`);
    });
}


async function getNFLState() {
    const nfl = await fetch(`https://api.sleeper.app/v1/state/nfl`);
    const nflData = await nfl.json(); 

    return nflData;
}
