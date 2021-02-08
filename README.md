# raspberry-sqs-consumer

Control your GPIOs over AWS SQS.


`Simplest raspberry sqs consumer you have ever seen.`

## Instructions
Just create a .env (see .env.example) at root dir.

### Install dependencies
```yarn install```

### Run
```yarn start```

### With pm2 (optional)

```yarn start:pm2```

### Run pm2 commands

```yarn pm2 <pm2 command>```

List process example:

```yarn pm2 ls```

### Show application logs (latest 1000 lines)
```yarn pm2 logs```

### Clear pm2 logs
```yarn pm2 logs:clear```

## TODO
[X] - winston logger with file rotation transporter


Enjoy =)