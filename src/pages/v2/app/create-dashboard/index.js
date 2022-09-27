import * as React from "react";
import { Layout as PageLayout } from "components/landing/layout/layout";
import { ClipLoader, BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClockLoader, DotLoader, FadeLoader, GridLoader,
HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SyncLoader } from "react-spinners";
import { useUser } from "lib/hooks";
import { useViewportSize, useHash, randomId, useLocalStorage } from "@mantine/hooks";
import { ActionIcon, Anchor, Button, Card, Center, Container, Group, Input, InputWrapper, Loader, LoadingOverlay, Navbar, Paper, Select, Switch, Text, Textarea, TextInput, Title } from "@mantine/core";
import { HomePage } from "components/HomePage";

import { useState } from 'react';
import {
  AppShell,
  Header,
  Footer,
  Aside,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';
import { GoBackHeader } from "components/DashboardHeader/DashboardHeader";
import { AlertCircle, ArrowLeft, ChevronLeft, ChevronRight, LayoutDashboard, Plus, Refresh, Trash, X } from "tabler-icons-react";
import AppLayout from "components/AppLayout";

function DashboardCanvas(){
  useUser({ redirectTo: "/auth/login"});
  let user2 = useUser();
  const [hash, setHash] = useHash();
  const { height, width } = useViewportSize();
  const [user, setUser] = React.useState(null);
  const [opened, setOpened] = useState(false);
  const [forms, setForms] = useState(null);
  const [newForms, setNewForms] = useState([]);
  const [done, setDone] = useState(true);
  const [form, setForm] = useState("");
  const [form_id, setFormID] = useState("");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [header, setShowHeader] = useState(true);
  const [nav, setNav] = useState(false);
  const [nav2, setNav2] = useState(false);
  const [footer, setShowFooter] = useState(true);
  const [card, setCard] = useState(true);
  const [charts, setCharts] = useState(true);
  const [statistics, setStatistics] = useState(true);
  const [publc, setPublic] = useState(true);
  const [creating, setCreating] = useState(false);
  const [response, setResponse] = useState(null);
  const [footerlinks, setFooterLinks] = useState([
    {label: "", href: ""}
  ])
  const [brand, setBrand] = useState("");
  const [templabel, setTempLabel] = useState("")
  const [headerlinks, setHeaderLinks] = useState([
    {label: "", href: ""}
  ])
  const theme = useMantineTheme();

  const [dashboarddata, setDashboardData] = useLocalStorage({
    key: 'create-dashboard-data',
    defaultValue: null,
  });

  const createDashboard = async () => {
    setCreating(true);
    const data = {
      form_id: form_id,
      title: title,
      description: description,
      header: header,
      nav: nav,
      headerLinks: headerlinks,
      footer: footer,
      nav2: nav2,
      footerLinks: footerlinks,
      charts: charts,
      statistics: statistics,
      publc: publc
    };

    setDashboardData(data);

    const body = {
      form_id: form_id
    }

    await fetch('/api/getresponse', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then( async function(res){
      if(res.status === 200){
        const data = await res.json();
        setResponse(data.response);
      } 
    }).catch(function(error) {
      console.log(error);
    });


  }

  const addURL = () => {
    setHeaderLinks(prevArr => ([...prevArr, {label: "", href: ""}]))
    console.log(headerlinks);
  }

  const addFooterURL = () => {
    setFooterLinks(prevArr => ([...prevArr, { label: "", href: ""}]))
  }

  const deleteFooterURL = (index) => {
    footerlinks.splice(index, 1);
    setFooterLinks([...footerlinks]);
  }

  const deleteURL = (index) => {
    headerlinks.splice(index, 1);
    setHeaderLinks([...headerlinks]);
  }

  const editLabel = (e, t, index) => {
    switch(t){
      case "header":
        headerlinks[index].label = e.currentTarget.value;
        setHeaderLinks([...headerlinks]);
        break;
      default:
        footerlinks[index].label = e.currentTarget.value;
        setFooterLinks([...footerlinks]);
    }
  }

  const editHref = (e, t,  index) => {
    switch(t){
      case "header":
        headerlinks[index].href = e.currentTarget.value;
        setHeaderLinks([...headerlinks]);
        break;
      default:
        footerlinks[index].href = e.currentTarget.value;
        setFooterLinks([...footerlinks]);
    }
  }

  React.useEffect(() => {
    setUser(user2);
  }, [user2]);

  const fetchData = async () => {
    if(user === null){
      return false;
    }
    const body = {
      user_id: user? user.user._id : ""
    }

    await fetch('/api/getAllUserForms', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    }).then( async function(res){
      if(res.status === 200){
        const data = await res.json();
        setForms(data.forms.reverse());
        setDone(false)
      } 
    }).catch(function(error) {
      console.log(error);
      setDone(false)
    })

  }

  React.useEffect(() => {

    fetchData();
  }, [user])

  const processArr = () => {
    let arr = [];
    forms !== null && forms.length > 0 && forms.forEach((item) => {
      arr.push({label: item.title, value: item.form_id});
    })

    setNewForms(arr);
  }

  React.useEffect(() => {

    processArr();
  }, [forms])

  const syncForms = async () => {
    await fetchData().then(() => {processArr()}).catch(function(error){
      console.log(error.message);
    })
  }

  React.useEffect(() => {
    if(form_id !== ""){
      let idx = newForms.findIndex((obj => obj.value === form_id));
      setTitle(newForms[idx].label);
    }
  }, [form_id]);
  
  const Loading = () => {
    return (
      <Center mt="20%">
        <ClimbingBoxLoader color="#002244" />
      </Center>
    )
  }

  
  const StoryBoard = () => {
    return (
      <>
      
      </>
    )
  }
  
  const MapBoard = () => {
    return (
      <>
      
      </>
    )
  }
  
  const ChartBoard = () => {
    return (
      <>
      </>
    )
  }
  
  const StatsBoard = () => {
    return (
      <>
      
      </>
    )
  }
  
  const HeaderBoard = () => {
    return (
      <Header height={70}>

      </Header>
    )
  }
  
  const HeaderLinks = () => {
    return (
      <>
      
      </>
    )
  }
  
  const SummaryBoard = () => {
    return (
      <>
      
      </>
    )
  }
  
  const FooterBoard = () => {
    return (
      <Footer height={60} p="md">
          Your custom footer
        </Footer>
    )
  }
  
  const FooterLinks = () => {
    return (
      <>
      
      </>
    )
  }

  return (
      <>
      <LoadingOverlay visible={creating} overlayBlur={2} />
        {step == 1 ? (
          <Container size={width - 300}>
          <Title style={{fontWeight: 300}} >Data Source</Title>
          <Paper mb={30} p="lg" mt={20}>
            <InputWrapper required label="Select Form" description="Select data source for the dashboard">
              <Select value={form_id} data={newForms} onChange={(val) => {setFormID(val)}} />
            </InputWrapper>
            {newForms.length < 1 && (
              <div>
                <ActionIcon title="Re-load" onClick={() => {syncForms()}} >
                  <Refresh />
                </ActionIcon>
              <Text mt={20} size="xs" color="red" >Looks like you have no forms</Text>
              <Anchor size="xs" href="/v2/build/">Create new form</Anchor> 
              <br />
              <GoBackHeader />
              </div>
            )}

            {newForms.length > 0 && (
              <div style={{marginTop: 20}} >
                <Button disabled={form_id === "" ? true : false} onClick={() => {setStep(2)}} rightIcon={<ChevronRight />}>Continue</Button>
              </div>
            )}
          </Paper>
          </Container>
        ) : step === 2 ? (
          <Container size={width - 300}>
          <Title mb={20} style={{fontWeight: 300}} >Dashboard details</Title>
            <Paper mb={30} p="lg" mt={20}>
            <Button variant="subtle" onClick={() => {setStep(1)}} leftIcon={<ArrowLeft />} color="gray">Back</Button>
              <InputWrapper required label="Dashboard Title" description="">
                <TextInput value={title} onChange={(e) => {setTitle(e.currentTarget.value)}} placeholder="e.g Mangroove Mapping" />
              </InputWrapper>
              <InputWrapper mt={10} label="Description" description="Brief, catchy statement(optional)">
                <Textarea value={description} onChange={(e) => {setDescription(e.currentTarget.value)}} />
              </InputWrapper>

              <Group mt={20} position="left">
              <Button disabled={title === "" ? true : false} onClick={() => {setStep(3)}} rightIcon={<ChevronRight />}>Continue</Button> 
              </Group>
            </Paper>
          </Container>
        ) :  step === 3 ? (
          <Container size={width - 300}>
            <Title mb={20} style={{fontWeight: 300}} >Customize header</Title>
            <Paper mb={30} p="lg" mt={20}>
            <Button variant="subtle" onClick={() => {setStep(2)}} leftIcon={<ArrowLeft />} color="gray">Back</Button>

             <InputWrapper mb={20} label="Header Panel" description="Show header panel">
                <Switch checked={header} onChange={(e) => {setShowHeader(e.currentTarget.checked)}} />
              </InputWrapper>

            {header ? (
              <InputWrapper mb={20} label="Navigation links" description="Add header nav links">
              <Switch checked={nav} onChange={(e) => {setNav(e.currentTarget.checked)}} />
            </InputWrapper>
            ) : null}

             { header && nav ?
              headerlinks.map((item, index) => {
                return (
                  <Group mb={20} grow noWrap key={index}>
                    <TextInput label="URL" description="url of the linking site e.g https://google.com/" value={headerlinks[index].href} onChange={(e) => {editHref(e, "header", index)}}  />
                    <TextInput label="Label" description="label to present the url e.g GeoPsy" value={headerlinks[index].label} onChange={(e) => {editLabel(e, "header", index)}} />
                    <Group>
                    {index === headerlinks.length - 1 ? (
                        <ActionIcon size="xs" mt={15} radius={28} style={{backgroundColor: 'teal'}} onClick={() => {addURL()}} >
                        <Plus color="white" />
                      </ActionIcon>
                    ) : null}
                      {index !== 0 ? (
                        <ActionIcon size="xs" style={{backgroundColor: 'red'}}  mt={15} radius={28} onClick={() => {deleteURL(index)}}>
                        <Trash color="white" />
                      </ActionIcon>
                      ) : null}
                    </Group>
                  </Group>
                )
               }) : null}

            <Group mt={40} position="left">
              <Button disabled={title === "" ? true : false} onClick={() => {setStep(4)}} rightIcon={<ChevronRight />}>Continue</Button> 
              </Group>
            </Paper>
          </Container>
        ) : step === 4 ? (
          <Container size={width - 300}>
            <Title mb={20} style={{fontWeight: 300}} >Customize footer</Title>
            <Paper mb={30} p="lg" mt={20}>
            <Button variant="subtle" onClick={() => {setStep(3)}} leftIcon={<ArrowLeft />} color="gray">Back</Button>

             <InputWrapper mb={20} label="Footer Panel" description="Show footer panel">
              <Switch checked={footer} onChange={(e) => {setShowFooter(e.currentTarget.checked)}} />
             </InputWrapper>

             {footer ? (
                <InputWrapper mb={20} label="Navigation Links" description="Add nav links to footer section">
                <Switch checked={nav2} onChange={(e) => {setNav2(e.currentTarget.checked)}} />
              </InputWrapper>
             ) : null}

             {footer && nav2 ? (
              footerlinks.map((item, index) => {
                return (
                  <Group noWrap mb={20} grow key={index}>
                    <TextInput label="URL" description="e.g https://geopsyresearch.org/terms" value={footerlinks[index].href} onChange={(e) => {editHref(e, "footer", index)}}  />
                      <TextInput label="Label" description="e.g Terms" value={footerlinks[index].label} onChange={(e) => {editLabel(e, "footer", index)}} />
                      <Group >
                    {footerlinks.length - 1 === index ? (
                        <ActionIcon size="xs" mt={15} radius={28} style={{backgroundColor: 'teal'}} onClick={() => {addFooterURL()}} >
                        <Plus color="white" />
                      </ActionIcon>
                    ) : null}
                    {index !== 0 ? (
                        <ActionIcon size="xs" mt={15} radius={28} style={{backgroundColor: 'red'}} onClick={() => {deleteFooterURL(index)}}>
                        <Trash color="white" />
                      </ActionIcon>
                    ) : null}
                    </Group>
                  </Group>
                )
              })
             ) : null}

            <Group mt={40} position="left">

              <Button disabled={title === "" ? true : false} onClick={() => {setStep(5)}} rightIcon={<ChevronRight />}>Continue</Button> 
              </Group>
            </Paper>
          </Container>
        ) : step === 5 ? (
          <Container size={width - 300} >
            <Title mb={20} style={{fontWeight: 300}} >Components Configuration</Title>
            <Paper mb={30} p="lg" mt={20} >
            <Button variant="subtle" onClick={() => {setStep(4)}} leftIcon={<ArrowLeft />} color="gray">Back</Button>
            {card ? (
                          <Card shadow="sm" mt={20} >
                          <Group position="apart" >
                               <Group position="left">
                                 <AlertCircle />
                                 <Text>Mandatory components</Text>
                               </Group>
             
                               <Group position="right">
                                 <ActionIcon onClick={() => {setCard(false)}} >
                                   <X color="teal" />
                                 </ActionIcon>
                               </Group>
                          </Group>
             
                          <Text mt={20}>Any dashboard contains a map dashboard configured by default. The location attribute data to be visualised is retrieved from location-based questions, thus forms lacking location-based questions 
                          have null location-based visualizations.</Text>
                         </Card>
            ) : null}
              <InputWrapper mt={10} label="Charts" description="Show charts using single or multiple select responses.">
                <Switch checked={charts} onChange={(e) => {setCharts(e.currentTarget.checked)}} />
              </InputWrapper>
              <InputWrapper mt={10} label="Statistics" description="Show statistics">
                <Switch checked={statistics} onChange={(e) => {setStatistics(e.currentTarget.checked)}} />
              </InputWrapper>
              <InputWrapper mt={10} label="Public" description="Allow anyone with url to this dashboard to view it.">
                <Switch checked={publc} onChange={(e) => {setPublic(e.currentTarget.checked)}} />
              </InputWrapper>

              <Group mt={40} position="left">

            <Button onClick={() => {createDashboard()}} rightIcon={<LayoutDashboard />}>Create Dashboard</Button> 
            </Group>
            </Paper>
          </Container>
        ) : (
            <>
            
            </>
        )}
      </>
  )
}

export default function IndexPage(){
  return (
    <AppLayout>
      <DashboardCanvas />
    </AppLayout>
  )
}