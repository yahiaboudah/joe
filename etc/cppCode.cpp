
#include "BasicExternalObject.h"

#include "SoSharedLibDefs.h"

#include <string>

#include <windows.h>

#include <stdio.h>

#include <iostream>

#if defined (_WINDOWS)

    #pragma warning(disable : 4996) // Turn off warning about deprecated strcpy on Win

#endif

/**

* \brief To allow string manipulation

*/

using namespace std;

/**

* \brief Utility function to handle strings and memory clean up

*

* \param s - The referenced string

*/

static char* getNewBuffer(string& s)

{

    // Dynamically allocate memory buffer to hold the string 

    // to pass back to JavaScript

    char* buff = new char[1+s.length()];

    

    memset(buff, 0, s.length()+1);

    strcpy(buff, s.c_str());

    return buff;

}

extern "C" BASICEXTERNALOBJECT_API long systemCmd(TaggedData* argv, long argc, TaggedData* retval)

{

    // The returned value type

    retval->type = kTypeString;    

    // Accept 1 and only 1 argument

    if(argc != 1)

    {

        return kESErrBadArgumentList;

    }

    // The argument must be a string

    if(argv[0].type != kTypeString)

    {

        return kESErrBadArgumentList;

    }

char*  cmd = (argv[0].data.string); 

    FILE* pipe = _popen(cmd, "r");

    if (!pipe) retval->data.string = "";

    char buffer[128];

    std::string result = "";

    while(!feof(pipe)) {

        if(fgets(buffer, 128, pipe) != NULL)

            result += buffer;

    }

    _pclose(pipe);

    retval->data.string = getNewBuffer(result);

    return kESErrOK;

}

extern "C" BASICEXTERNALOBJECT_API long getClipboard(TaggedData* argv, long argc, TaggedData* retval)

{

    // The returned value type

    retval->type = kTypeString;    

    HANDLE h;   

  if (!OpenClipboard(NULL)) return kESErrBadArgumentList;  

  h = GetClipboardData(CF_TEXT);

  CloseClipboard();

  if(h){

  string text;

    text = (char*)h;

    if(text.length() < 1) return kESErrBadArgumentList;

    retval->data.string = getNewBuffer(text);

  }else{

retval->data.string = "";

  }

    return kESErrOK;

}

extern "C" BASICEXTERNALOBJECT_API long clearClipboard(TaggedData* argv, long argc, TaggedData* retval)

{

    if (OpenClipboard(NULL)){

        EmptyClipboard();

        CloseClipboard();

    }

    return kESErrOK;

}

extern "C" BASICEXTERNALOBJECT_API long setClipboard(TaggedData* argv, long argc, TaggedData * retval)

{    

    // Accept 1 and only 1 argument

    if(argc != 1)

    {

        return kESErrBadArgumentList;

    }

    // The argument must be a string

    if(argv[0].type != kTypeString)

    {

        return kESErrBadArgumentList;

    }

string source = (argv[0].data.string); 

int len = source.length() +1;

source = source.c_str();

if(OpenClipboard(NULL))

{

    HGLOBAL clipbuffer;

    char * buffer;

    EmptyClipboard();

    clipbuffer = GlobalAlloc(GMEM_DDESHARE, len);

    buffer = (char*)GlobalLock(clipbuffer);

    strcpy(buffer, LPCSTR(source.c_str()));

    GlobalUnlock(clipbuffer);

    SetClipboardData(CF_TEXT,clipbuffer);

    CloseClipboard();

}

    return kESErrOK;

}

/**

* \brief Free any string memory which has been returned as function result.

*

* \param *p Pointer to the string

*/

BASICEXTERNALOBJECT_API void ESFreeMem (void* p)

{ 

    delete(char*)(p);

}

/**

* \brief Returns the version number of the library

*

* ExtendScript publishes this number as the version property of the object 

* created by new ExternalObject.

*/

BASICEXTERNALOBJECT_API long ESGetVersion()

{

    return 0x1;

}

/**

* \brief Initialize the library and return function signatures.

*

* These signatures have no effect on the arguments that can be passed to the functions.

* They are used by JavaScript to cast the arguments, and to populate the

* reflection interface.

*/

BASICEXTERNALOBJECT_API char* ESInitialize (const TaggedData ** argv, long argc) 

{ 

    return "makeArray,getAverage,appendString_s,myScript_a,acceptBoolean_b";

}

/**

* \brief Terminate the library.

*

* Does any necessary clean up that is needed.

*/

BASICEXTERNALOBJECT_API void ESTerminate()

{

    

}
