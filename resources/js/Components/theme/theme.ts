import { createTheme, rem } from '@mantine/core';

const inputDefaultProps = {
    placeholder: 'Ketik disini',
    size: 'md',
};

export const theme = createTheme({
    primaryColor: 'dark',
    // colorScheme: "light",
    components: {
        ModalTitle: {
            defaultProps: {
                fw: 700,
                fz: rem(18),
                zIndex: 9999,
            },
        },
        InputWrapper: {
            defaultProps: {
                inputWrapperOrder: ['label', 'input', 'description', 'error'],
            },
        },
        InputLabel: {
            defaultProps: {
                fw: 400,
                mb: rem(4),
            },
        },
        Input: {
            defaultProps: inputDefaultProps,
        },
    },
});
