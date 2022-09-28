import { createStyles } from "@mantine/core";
export default createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
      root: {
        position: 'relative',
      },
    
      input: {
        height: 'auto',
        paddingTop: 18,
      },
    
      label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
      },
            header: {
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
            },
          
            inner: {
              height: 34,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
    
            tableHeader: {
              position: 'sticky',
              top: 0,
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
              transition: 'box-shadow 150ms ease',
          
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                borderBottom: `1px solid ${
                  theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
              },
            },
          
            scrolled: {
              boxShadow: theme.shadows.sm,
            },
          
            links: {
              [theme.fn.smallerThan('md')]: {
                display: 'none',
              },
            },
          
            linkActive: {
              '&, &:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
                color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
                [`& .${icon}`]: {
                  color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
                },
              },
            },
            user: {
              display: 'block',
              width: '100%',
              padding: theme.spacing.md,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          
              '&:hover': {
                backgroundColor: 'transparent'
              },
            },
          
            logo: {
                boxSizing: 'border-box',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: 60,
                paddingTop: theme.spacing.md,
                borderBottom: `1px solid ${
                  theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
                }`,
                marginBottom: theme.spacing.xl,
              },
          
            group: {
              borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
              }`,
            },
          
            search: {
              [theme.fn.smallerThan('xs')]: {
                display: 'none',
              },
            },
          
            link: {
              display: 'block',
              lineHeight: 1,
              padding: '8px 12px',
              borderRadius: theme.radius.sm,
              textDecoration: 'none',
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
              fontSize: theme.fontSizes.sm,
              fontWeight: 500,
          
              '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            },
            navbar: {
              paddingTop: 0,
            },
          
        section: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        marginBottom: theme.spacing.md,
    
        '&:not(:last-of-type)': {
          borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
          }`,
        },
      },
    
      searchCode: {
        fontWeight: 700,
        fontSize: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        border: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
        }`,
      },
    
      mainLinks: {
        paddingLeft: theme.spacing.md - theme.spacing.xs,
        paddingRight: theme.spacing.md - theme.spacing.xs,
        paddingBottom: theme.spacing.md,
      },
    
      mainLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.fontSizes.xs,
        padding: `8px ${theme.spacing.xs}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
    
      },
    
      mainLinkInner: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    
      },
    
      mainLinkIcon: {
        marginRight: theme.spacing.sm,
      },
    
      mainLinkText: {
        color: "white"
      },
    
      mainLinkBadge: {
        padding: 0,
        width: 20,
        height: 20,
        pointerEvents: 'none',
        //color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[6],
    
      },
    
      collections: {
        paddingLeft: theme.spacing.md - 6,
        paddingRight: theme.spacing.md - 6,
        paddingBottom: theme.spacing.md,
      },
    
      collectionsHeader: {
        paddingLeft: theme.spacing.md + 2,
        paddingRight: theme.spacing.md,
        marginBottom: 5,
      },
    
      collectionLink: {
        display: 'block',
        padding: `8px ${theme.spacing.xs}px`,
        textDecoration: 'none',
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        lineHeight: 1,
        fontWeight: 500,
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
            trashBtn: {
              '&:hover': {
                color: 'red'
              },
            },
          
            headerLink: {
              padding: `8px ${theme.spacing.xs}px`,
              textDecoration: 'none',
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              borderRadius: theme.radius.sm,
              fontSize: theme.fontSizes.xs,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
              lineHeight: 1,
              fontWeight: 700,
          
              '&:hover': {
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              },
            },
            title: {
              color: '#228BE6',
              fontWeight: 300,
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            },
    }
    });
    