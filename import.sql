-- auto-generated definition
create table npwd_crypto_transactions
(
    id         int auto_increment
        primary key,
    identifier varchar(20)                           null,
    type       varchar(20)                           null,
    amount     float                                 null,
    worth      float                                 null,
    sentTo     varchar(20)                           null,
    createdAt  timestamp default current_timestamp() null
);
