import { styled } from '@mui/material/styles';
import { FormControl } from '@mui/material';

// We create styled components that replace the old 'classes'
export const Container = styled('div')(({ theme }) => ({
  padding: '25px',
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: '100%', // Changed to 100% so the Grid controls the width
  marginBottom: '20px',
}));
export const SelectEmpty = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const Loading = styled('div')(({ theme }) => ({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ListContainer = styled('div')(({ theme }) => ({
  height: '75vh',
  overflow: 'auto',
}));