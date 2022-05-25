import { Context, logging, PersistentMap, storage } from "near-sdk-as";

// const votes = new PersistentMap<string, string>("votes");
const participations = new PersistentMap<string, string>("participants");

// View Methods
export function getVotes(): Map<string, string> | null {
  return storage.get<Map<string, string>>("my-votes");
}

export function getIsUserParticipated(accountId: string): bool {
  if (participations.contains(accountId)) {
    return true;
  }

  return false;
}

export function getVote(accountId: string): string | null {
  return participations.get(accountId, "");
}

// Change Methods
// Cost a transaction fee to change the state of
export function vote(option: string): void {
  const accountId = Context.sender;
  logging.log("Starting...");

  const votes = storage.get<Map<string, string>>("my-votes");
  if (votes != null) {
    if (votes.has(option)) {
      const numberOfVotes = votes.get(option);
      if (numberOfVotes != null) {
        const votesNumber = parseInt(numberOfVotes!) + 1;

        votes.set(option, votesNumber.toString());
      } else {
        votes.set(option, "1");
      }
    } else {
      votes.set(option, "1");
    }

    storage.set("my-votes", votes);
  } else {
    const newVotes = new Map<string, string>();
    newVotes.set(option, "1");
    storage.set("my-votes", newVotes);
  }

  participations.set(accountId, option);

  logging.log(`User: "${accountId}" vote for "${option}"`);
}
