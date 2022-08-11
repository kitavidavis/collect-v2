import { createStyles, Text } from '@mantine/core';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));


export function Statistics() {
    const [users, setUsers] = useState(0);
    const [forms, setForms] = useState(0);
    const [response, setResponse] = useState(0);

    const data = [
        {
            "title": "New Users",
            "stats": users,
            "description": "100% more than in the same month last year, new user engagement up by 6%"
          },
          {
            "title": "New Forms",
            "stats": forms,
            "description": "100% more compared to same month last year, 170% more than two years ago"
          },
          {
            "title": "Recorded Response",
            "stats": response,
            "description": "100% more compared to same month last year, 120% more than two years ago"
          }
    ]

    const fetchAllUsers = async () => {
        try {

            await fetch('/api/getallusers').then(async function(res){
                if(res.status === 200){
                    res = await res.json();
                    console.log(res.users.users);
                    setUsers(res.users.users);
                }
            })

        } catch(error){
            console.log(error);
        }
    }

    const fetchAllForms = async () => {
        try {
            await fetch('/api/getallforms').then(async function(res){
                if(res.status === 200){
                    res = await res.json();

                    setForms(res.forms.forms);
                }
            })
        } catch(error){
            console.log(error);
        }
    }

    const fetchAllResponse = async () => {
        try {
            await fetch('/api/getallresponse').then(async function(res){
                if(res.status === 200){
                    res = await res.json();
                    setResponse(res.responses.responses)
                }
            })
        } catch(error){
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchAllUsers();
        fetchAllForms();
        fetchAllResponse()
    }, []);
  const { classes } = useStyles();
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}