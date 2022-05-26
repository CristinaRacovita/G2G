import { Context, logging, PersistentMap, storage } from "near-sdk-as";

const participations = new PersistentMap<string, string>("participants");
const VOTES_KEY = "my-votes";
const DEFAULT_VOTES_VALUE = "1";

// View Methods
export function getVotes(): Map<string, string> | null {
  logging.log("Get all the votes.");

  return storage.get<Map<string, string>>(VOTES_KEY);
}

export function getIsUserParticipated(accountId: string): bool {
  logging.log("Check if current participant voted.");

  if (participations.contains(accountId)) {
    return true;
  }

  return false;
}

export function getVote(accountId: string): string | null {
  logging.log("Get the vote for current participant.");

  return participations.get(accountId, "");
}

// Change Methods
// Cost a transaction fee to change the state of
export function vote(option: string): void {
  const accountId = Context.sender;
  logging.log("Update the votes map...");

  setMap(VOTES_KEY, option);

  logging.log("Update the participants map...");

  participations.set(accountId, option);

  logging.log(`User: "${accountId}" vote for "${option}"`);
}

//private methods

function setMap(storageKey: string, mapKey: string): void {
  const map = storage.get<Map<string, string>>(storageKey);
  if (map != null) {
    if (map.has(mapKey)) {
      const mapValue = map.get(mapKey);
      const newMapValue = parseInt(mapValue!) + 1;
      map.set(mapKey, newMapValue.toString());
    } else {
      map.set(mapKey, DEFAULT_VOTES_VALUE);
    }
    storage.set(storageKey, map);
  } else {
    const newMap = new Map<string, string>();
    newMap.set(mapKey, DEFAULT_VOTES_VALUE);
    storage.set(storageKey, newMap);
  }
}
