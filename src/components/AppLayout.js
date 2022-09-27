import React, {  useState} from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  ActionIcon,
  UnstyledButton,
  TextInput,
  Badge,
  useMantineColorScheme,
  Drawer,
  ScrollArea,
  Indicator,
  Title,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { User, Search,Bell, LayoutDashboard, FileDatabase, Logout, Sun, Moon, BrandCodesandbox, Settings, Books, 
       Crosshair, 
       Tools} from 'tabler-icons-react';
import { useUser } from 'lib/hooks';
import { UserInfo } from 'components/userInfo';
import useStyles from "./AppLayout.styles";
import { useRouter } from "next/router"

export default function AppLayout( { children } ){
    useUser({ redirectTo: '/auth/login' });
    const user2 = useUser();
    const [linkactive, setLinkActive] = useState('Forms');
    const [userforms, setUserForms] = useState([]);
    const [done, setDone] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [utitle, setUtitle] = useState("");
    const [phone, setPhone] = useState("");
    const navlinks = [
      { icon: FileDatabase, label: 'Forms', href: '/v2', notifications: userforms.length },
      { icon: LayoutDashboard, label: 'Dashboards', href: '/v2/app/create-dashboard'},
      { icon: Crosshair, label: 'Survey Computations', href: '#' },
      { icon: BrandCodesandbox, label: 'API Integration', href: '#'},
      { icon: Tools, label: "Configure", href: "#" },
      { icon: Settings, label: 'Settings', href: '#' },
      { icon: Books, label: 'Documentation', href: 'https://geopsy-collect.gitbook.io/home/', target: "_blank" },
      { icon: User, label: "Account", href: "#"},
      { icon: Logout, label: 'Logout', href: '/api/logout' },
    ];

    React.useEffect(() => {
      setDone(false);
      const fetchdata = async () => {
        if(user2 === null){
          return false;
        }

        const body = {
          user_id: user2? user2.user._id : ''
        }

        await fetch('/api/getAllUserForms', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }).then( async function(res){
          if(res.status === 200){
            const data = await res.json();
            if(user2.user !== null && user2.user !== undefined){
              setFirstname(user2.user.firstname);
              setLastName(user2.user.lastname)
              setEmail(user2.user.username)
              setUtitle(user2.user.job);
              setPhone(user2.user.phone);
            }
            setUserForms(data.forms.reverse());
            setDone(true);
          } 
        }).catch(function(error) {
          console.log(error);
        })
      }

        fetchdata();
    }, [user2]); 

      const theme = useMantineTheme();
      const [query2, setQuery2] = useState('');
      const { classes } = useStyles();
      const [opened, setOpened] = useState(false);
      const { colorScheme, toggleColorScheme } = useMantineColorScheme();
      const router = useRouter();

      const mainLinks = navlinks.filter(item => {
        if(query2 === '') {
          return item;
        } else if(item.label.toLocaleLowerCase().includes(query2.toLocaleLowerCase())){
          return item;
        }
      }).map((link, index) => (
        <UnstyledButton mt={10} onClick={() => {setLinkActive(link.label)}} component="a" href={link.href} target={link.target? link.target : "_parent"} key={link.label} className={classes.mainLink}>
          <div className={classes.mainLinkInner}>
          <link.icon color={router.pathname == link.href ? "yellow" : "white"} size={20} className={classes.mainLinkIcon}/>
            <span style={{color: router.pathname == link.href ? "yellow" : "white"}} >{link.label}</span>
          </div>
          {link.notifications && (
            <Badge size="sm" variant="filled" color='yellow' className={classes.mainLinkBadge}>
              {link.notifications}
            </Badge>
          )}
        </UnstyledButton>
      ));

      const { height, width } = useViewportSize();
     
      return (
        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={
              <MediaQuery smallerThan="md" styles={{display: 'none'}}>
               <Navbar sx={(theme) => ({left: 0, bottom: 0, top: 0, height: '100%', backgroundColor: "#002244"})} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 250}}>
                   <Navbar.Section className={classes.section} >
                    <UserInfo avatar= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" name={firstname + " " + lastname} title={utitle} phone={phone} email={email} />
                    </Navbar.Section>
                    <TextInput
                    placeholder="Search"
                    size="xs"
                    value={query2}
                    onChange={(e) => {setQuery2(e.currentTarget.value)}}
                    icon={<Search size={12} />}
                    rightSectionWidth={70}
                    styles={{input: {backgroundColor: 'white', color: 'black'}}}
                    mb="sm"
                    />
                    <Navbar.Section grow component={ScrollArea} className={classes.section}>
                        <div className={classes.mainLinks}>{mainLinks}</div>
                    </Navbar.Section>
               </Navbar>
              </MediaQuery>
          }

          header={
            <Header className={classes.header} style={{ backgroundColor: "#002244"}} height={60} p="md">
              <div className={classes.inner}>
              <Group>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                </Group>
                <Group>
                <Group ml={50} spacing="lg">
                  <Indicator color="yellow" label={3} overflowcount={10} inline size={22}>
                    <Bell color='white' />
                  </Indicator>
                  <ActionIcon style={{backgroundColor: 'transparent'}} onClick={() => {toggleColorScheme()}} >
                    {theme.colorScheme === "dark" ? <Sun color='white' /> : <Moon color='white' />}
                  </ActionIcon>
              </Group>
                </Group>
              </div>
            </Header>
          }
        >
                <Drawer onClose={() => {setOpened(false)}} opened={opened}>
                <Navbar height={height} sx={(theme) => ({left: 0, bottom: 0, top: 0,height: height, backgroundColor: "#002244"})} p="md" hiddenBreakpoint="sm" hidden={!opened} className={classes.navbar} width={{ sm: 250}}>
                    <Navbar.Section className={classes.section} >
                    <UserInfo avatar= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" name={firstname + " " + lastname} title={utitle} phone={phone} email={email} />
                </Navbar.Section>
                    <TextInput
                    placeholder="Search"
                    size="xs"
                    value={query2}
                    onChange={(e) => {setQuery2(e.currentTarget.value)}}
                    icon={<Search size={12} />}
                    rightSectionWidth={70}
                    styles={{input: {backgroundColor: 'white', color: 'black'}}}
                    mb="sm"
                />
                    <Navbar.Section grow component={ScrollArea} className={classes.section}>
                    <div className={classes.mainLinks}>{mainLinks}</div>
                </Navbar.Section>
            </Navbar>
                </Drawer>

                
            {children}
          
        </AppShell>
      );
    }
