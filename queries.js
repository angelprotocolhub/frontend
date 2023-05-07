import { gql } from "@apollo/client";

const GET_CREDITS = gql`
  query GetCredits($recipient: Bytes) {
    transactionEntities(where: { recipient: $recipient }, first: 5) {
      id
      sender
      senderUserName
      recipient
      recipientUserName
      asset
      amountOrTokenId
      narration
      status
      txReference
      time
      txType
    }
  }
`;

const GET_DEBITS = gql`
  query GetDebits($sender: Bytes) {
    transactionEntities(where: { sender: $sender }, first: 5) {
      id
      sender
      senderUserName
      recipient
      recipientUserName
      asset
      amountOrTokenId
      narration
      status
      txReference
      time
      txType
    }
  }
`;

const GET_BENEFICIARIES = gql`
  query GetBeneficiaries($sender: Bytes) {
    beneficiaryEntities(where: { sender: $sender }) {
      id
      sender
      beneficiary
    }
  }
`;

const GET_ALL_USERS_TX = gql`
  query GetUsersTransactions($user: Bytes, $beneficiary: Bytes) {
    transactionEntities(
      where: {
        or: [
          { sender: $user }
          { recipient: $user }
          { sender: $beneficiary }
          { recipient: $beneficiary }
        ]
      }
      orderBy: time
      orderDirection: asc
    ) {
      id
      sender
      senderUserName
      recipient
      recipientUserName
      asset
      amountOrTokenId
      narration
      status
      txReference
      time
      txType
    }
  }
`;

const GET_USER_CLAIMS = gql`
  query GetUsersTransactions($user: Bytes, $status: Int) {
    transactionEntities(
      where: { and: [{ recipient: $user }, { status: $status }] }
      orderBy: time
      orderDirection: asc
    ) {
      id
      sender
      senderUserName
      recipient
      recipientUserName
      asset
      amountOrTokenId
      narration
      status
      txReference
      time
      txType
    }
  }
`;

const GET_USERS_TRANSACTIONS = gql`
  query GetUsersTransactions($user: Bytes) {
    transactionEntities(
      where: { or: [{ sender: $user }, { recipient: $user }] }
      orderBy: time
      orderDirection: asc
    ) {
      id
      sender
      senderUserName
      recipient
      recipientUserName
      asset
      amountOrTokenId
      narration
      status
      txReference
      time
      txType
    }
  }
`;

module.exports = {
  GET_CREDITS,
  GET_DEBITS,
  GET_ALL_USERS_TX,
  GET_BENEFICIARIES,
  GET_USER_CLAIMS,
  GET_USERS_TRANSACTIONS,
};
