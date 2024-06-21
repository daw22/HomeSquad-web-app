import { Box, Typography } from '@mui/material';

function FooterSection() {
  return (
    <Box
    sx={{
        width: '100%',
        padding: '15px 40px',
        background: 'black',
        color: 'white',
    }}>
        <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Box sx={{width: '50%'}}>
                <Typography sx={{marginBottom: '10px'}}>HomeSquad inc</Typography>
                <Typography variant='h6'>Contact</Typography>
                <Typography>phone: +1 234-567-890</Typography>
                <Typography>email: homesquad@fakemail.com</Typography>
            </Box>
            <Box sx={{ width: '50%'}}>
                <Typography>copyright@2024</Typography>
            </Box>
        </Box>
    </Box>
)
}

export default FooterSection;